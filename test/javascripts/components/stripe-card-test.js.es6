import componentTest from "helpers/component-test";

moduleForComponent("stripe-card", { integration: true });

componentTest("stripe card success", {
  template: `{{stripe-card stripePaymentHandler=onSubmit}}`,

  beforeEach() {
    window.Stripe = () => {
      return {
        createPaymentMethod() {
          return new Ember.RSVP.Promise((resolve) => {
            resolve({ paymentMethod: { id: 'payment-method-id' }});
          });
        },
        elements() {
          return {
            create() {
              return { mount() {}, card() {} };
            },
          };
        },
      };
    };
  },

  async test(assert) {
    assert.expect(1);

    this.set("onSubmit", (arg) => {
      assert.equal(arg, "payment-method-id", "payment method created");
    });

    await click(".btn-payment");
  },
});
