import { default as computed } from "ember-addons/ember-computed-decorators";
import { ajax } from "discourse/lib/ajax";

export default Ember.Controller.extend({
  actions: {
    stripeTokenHandler(token) {
      ajax("/donate/charges", {
        data: { },
        method: "post"
      }).then((result) => {
        console.log(result);
      });
    },
  },
});
