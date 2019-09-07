import { default as computed } from "ember-addons/ember-computed-decorators";
import { ajax } from "discourse/lib/ajax";

export default Ember.Controller.extend({
  actions: {
    stripeTokenHandler(result) {
      console.log('do request', result);
    },
  },
});
