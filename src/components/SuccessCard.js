import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function SuccessCard() {
  return (
    <div class="card text-center">
      <div class="card-header">CONFIRMED!!</div>
      <div class="card-body">
        <h2 class="card-title">Payment Successful!!</h2>
        <p class="card-text">Purchase received. We'll contact you soon!</p>
        <a href="/" class="btn btn-primary">
          Home Page
        </a>
      </div>
    </div>
  );
}
