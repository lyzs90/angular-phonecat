(function() {
  'use strict';

  angular
    .module('profile')
    .component('profile', {
      templateUrl: 'profile/profile.template.html',
      controller: ProfileController
    });

  ProfileController.$inject = ['store'];

  function ProfileController(store) {
    var vm = this;
    vm.profile = JSON.parse(store.get('profile'));
  }
})();
