import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { 
  CreditCard, ShieldCheck, Zap, Receipt, CheckCircle, 
  AlertCircle, Loader2, ArrowLeft, Crown 
} from 'lucide-react';

const BillingView = ({ onBack, onUpgradeSuccess }) => {
  const { getToken } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await getToken();
      const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
      const res = await axios.get(`${API_BASE_URL}/api/interview/user-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(res.data);
    } catch (err) {
      console.error('Profile Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const token = await getToken();
      const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Create Razorpay Order
      const orderRes = await axios.post(`${API_BASE_URL}/api/payments/create-order`, { amount: 49900 }, { headers });
      const order = orderRes.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PrepGrid AI",
        description: "Upgrade to Pro Tier",
        order_id: order.id,
        handler: async function (response) {
          try {
            setUpgrading(true);
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payments/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: 49900
            }, { headers });
            
            alert(verifyRes.data.message);
            onUpgradeSuccess();
            fetchProfile();
          } catch (vErr) {
            console.error('Verification Error:', vErr);
            alert('Payment verification failed.');
          } finally {
            setUpgrading(false);
          }
        },
        prefill: {
          name: userProfile?.name || "",
          email: userProfile?.email || "",
        },
        theme: {
          color: "#14532D",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp1.open();
      setUpgrading(false);

    } catch (err) {
      console.error('Upgrade Error:', err);
      alert('Payment failed to initialize.');
      setUpgrading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <Loader2 className="w-12 h-12 text-[#14532D] animate-spin" />
      <p className="text-[#374151] font-bold uppercase tracking-widest text-sm">Loading Billing Details...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#14532D] font-bold text-sm transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-[#14532D]" />
          <h2 className="text-3xl font-black text-[#111827] tracking-tight uppercase">Billing <span className="text-[#14532D]">& Plan</span></h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* CURRENT PLAN CARD */}
        <div className={`p-8 rounded-[32px] border-2 transition-all ${userProfile?.isPro ? 'border-[#14532D] bg-[#14532D]/5' : 'border-[#E5E7EB] bg-white'}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${userProfile?.isPro ? 'bg-[#14532D] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                {userProfile?.isPro ? 'PRO ACCOUNT' : 'FREE ACCOUNT'}
              </span>
              <h3 className="text-4xl font-black text-[#111827] mt-4 tracking-tighter uppercase">
                {userProfile?.isPro ? 'Expert Tier' : 'Starter Tier'}
              </h3>
            </div>
            {userProfile?.isPro ? (
              <div className="w-14 h-14 bg-[#14532D] rounded-2xl flex items-center justify-center shadow-lg shadow-[#14532D]/20">
                <Crown className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-14 h-14 bg-[#F3F4F6] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#D1D5DB]" />
              </div>
            )}
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
              <CheckCircle className={`w-5 h-5 ${userProfile?.isPro ? 'text-[#14532D]' : 'text-[#D1D5DB]'}`} />
              Unlimited AI Interviews
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
              <CheckCircle className={`w-5 h-5 ${userProfile?.isPro ? 'text-[#14532D]' : 'text-[#D1D5DB]'}`} />
              Advanced Performance Analytics
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
              <CheckCircle className={`w-5 h-5 ${userProfile?.isPro ? 'text-[#14532D]' : 'text-[#D1D5DB]'}`} />
              Role-Specific Question Banks
            </div>
          </div>

          {!userProfile?.isPro && (
            <button 
              onClick={handleUpgrade}
              disabled={upgrading}
              className="w-full bg-[#111827] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#1F2937] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              {upgrading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  INITIALIZING SECURE CHECKOUT...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  UPGRADE TO PRO — ₹499
                </>
              )}
            </button>
          )}
        </div>

        {/* BILLING HISTORY */}
        <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <Receipt className="w-6 h-6 text-[#14532D]" />
            <h3 className="text-xl font-bold text-[#111827] uppercase tracking-tighter">Transaction Log</h3>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {(userProfile?.billingHistory || []).length > 0 ? (
              userProfile.billingHistory.reverse().map((item, idx) => (
                <div key={idx} className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex items-center justify-between group hover:border-[#14532D]/30 transition-all">
                  <div>
                    <span className="block text-xs font-bold text-[#111827]">PRO SUBSCRIPTION</span>
                    <span className="text-[10px] text-[#6B7280] font-mono">{new Date(item.date).toLocaleDateString()} • {item.transactionId.slice(-8)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-black text-[#14532D]">₹{item.amount}</span>
                    <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-30 py-20">
                <AlertCircle className="w-10 h-10" />
                <p className="text-xs font-bold italic">No transactions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingView;
