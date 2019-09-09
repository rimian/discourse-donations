import componentTest from "helpers/component-test";

moduleForComponent("donation-form", { integration: true });

componentTest("donation form has content", {
  template: `{{donation-form}}`,

  beforeEach() {
    this.registry.register(
      "component:stripe-card",
      Ember.Component.extend({ tagName: "dummy-component-tag" })
    );
  },

  async test(assert) {
    assert.ok(find("#payment-form").length, "The form renders");
    assert.ok(
      find("dummy-component-tag").length,
      "The stripe component renders"
    );
  }
});

componentTest("donation form has a confirmation", {
  template: `{{donation-form confirmation=confirmation}}`,

  beforeEach() {
    this.registry.register(
      "component:stripe-card",
      Ember.Component.extend()
    );

    this.set("confirmation", {
      "id": "pm_123456789",
      "object": "payment_method",
      "card": {
        "brand": "visa",
        "checks": {
          "address_line1_check": null,
          "address_postal_code_check": null,
          "cvc_check": null
        },
        "country": "US",
        "exp_month": 8,
        "exp_year": 2020,
        "fingerprint": "ocap4Sxc0SLss757",
        "funding": "credit",
        "generated_from": null,
        "last4": "4242",
        "three_d_secure_usage": {
          "supported": true
        },
        "wallet": null
      },
      "created": 123456789,
      "customer": null,
      "livemode": false,
      "metadata": {
        "order_id": "123456789"
      },
      "type": "card"
    });
  },

  async test(assert) {
    assert.ok(
      find(".discourse-donations-confirmation").length,
      "The confirmation form renders"
    );
  }
});
