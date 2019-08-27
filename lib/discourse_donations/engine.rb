# frozen_string_literal: true

module ::DiscourseDonations
  class Engine < ::Rails::Engine
    engine_name 'discourse-donations'
    isolate_namespace DiscourseDonations
  end
end
