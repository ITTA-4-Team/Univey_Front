import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import customaxios from "../api/Axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function PaymentRequest() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(3000);
  const [orderName, setOrderName] = useState("유니베이 포인트 충전");
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const clientKey = process.env.REACT_APP_CLIENT_KEY;

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      const random = new Date().getTime() + Math.random();
      const customerKey = btoa(random);

      try {
        const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
        console.log("Loaded Widget:", loadedWidget);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // 결제 수단 위젯 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;

    // 이용약관 위젯 렌더링
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // 가격 업데이트
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    try {
      // 프론트엔드에서 결제 요청 API 호출
      const response = await customaxios.post(
        "/api/v1/payments/toss",
        {
          payType: "CARD",
          amount: price,
          orderName,
          successUrl: "https://www.univey.net/api/v1/payments/toss/success",
          failUrl: "https://www.univey.net/api/v1/payments/toss/fail",
        },
        {
          headers: { Authorization: `${userInfo.accesstoken}` },
        }
      );

      const { orderId, userEmail, userName, successUrl, failUrl } =
        response.data.data;

      // 토스 페이먼츠 결제창 호출
      await paymentWidget?.requestPayment({
        orderId,
        orderName,
        customerName: userName,
        customerEmail: userEmail,
        successUrl,
        failUrl,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* amount 값 지정 */}
      <div className="ml-5 mb-5">
        <label htmlFor="amountInput">충전 금액 : </label>
        <input
          className="p-1 rounded border-1 border-main_color bg-white text-text_color"
          type="number"
          id="amountInput"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      {/* 결제하기 버튼 */}
      <button
        className="px-7 py-2 ml-5 mb-20 bg-sub_text_color_4 text-white rounded-xl"
        onClick={handlePaymentRequest}
      >
        결제하기
      </button>
    </div>
  );
}
