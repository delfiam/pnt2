<script>
const buttons = document.querySelectorAll('.payment-button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remover la clase 'selected' de todos los botones
    buttons.forEach(btn => btn.classList.remove('selected'));
    // Agregar la clase 'selected' al botón clickeado
    button.classList.add('selected');
  });
});</script>
<template>
<div class="payment-container">
    <h2 class="payment-title">Payment Method</h2>
    <p class="payment-subtitle">Add a new payment method to your account.</p>
  
    <div class="payment-options">
      <button class="payment-button selected">Card</button>
      <button class="payment-button">Paypal</button>
      <button class="payment-button">Apple</button>
    </div>
  
    <input type="text" class="input-field" placeholder="First Last" />
    <input type="text" class="input-field" placeholder="Card number" />
  
    <div class="input-row">
      <select class="input-select">
        <option disabled selected>Month</option>
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
  
      <select class="input-select">
        <option disabled selected>Year</option>
        <option>2025</option>
        <option>2026</option>
        <option>2027</option>
        <option>2028</option>
        <option>2029</option>
      </select>
  
      <input type="text" class="input-field cvc" placeholder="CVC" />
    </div>
  
    <button class="continue-button">Continue</button>
  </div>
</template>

<style scoped>
.payment-container {
  background-color: #1e1e1e;
  color: white;
  padding: 24px;
  border-radius: 12px;
  width: 360px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}

.payment-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.payment-subtitle {
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 16px;
}

.payment-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.payment-button {
  flex: 1;
  margin: 0 4px;
  background-color: transparent;
  color: white;
  border: 1px solid #555;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-button.selected,
.payment-button:hover {
  background-color: white;
  color: black;
  border-color: white;
}

.input-field,
.input-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #2a2a2a;
  color: white;
  font-size: 0.95rem;
}

.input-select {
  appearance: none;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.cvc {
  max-width: 80px;
}

.continue-button {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.continue-button:hover {
  background-color: #e0e0e0;
}
</style>