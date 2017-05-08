angular.module('App')
.controller('WeatherController', function ($scope, $http, $ionicLoading, $stateParams, $ionicActionSheet, $ionicModal, Locations, Settings) {
  $scope.params = $stateParams;
  $scope.settings = Settings;
  
  //in order to allow ionicRefresher to work, we need this service call to be placed within a method
  //also, we are asked to utilize an $ionicLoading when calling the weather: http://ionicframework.com/docs/api/service/$ionicLoading/
  $scope.getWeather = function(){
    
    /*
    var url = '/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng
   
		var trustedUrl = $sce.trustAsResourceUrl(url);						
    
    $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
    */
    
    
    $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, {params: {units: Settings.units}})
    .success(function (forecast) {
      $scope.forecast = forecast;
      $ionicLoading.hide();
    })
    .error(function(err){
      console.log(err);
      $ionicLoading.show({
        template: 'Could not load weather. Please try again later.',
        duration: 3000
      });
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });;
  };
  
  //used to show activity is occurring
  $ionicLoading.show();
  //call get weather
  $scope.getWeather();

  var barHeight = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
  $scope.getWidth = function () {
    return window.innerWidth + 'px';
  };
  $scope.getTotalHeight = function () {
    return parseInt(parseInt($scope.getHeight()) * 3) + 'px';
  };
  $scope.getHeight = function () {
    return parseInt(window.innerHeight - barHeight) + 'px';
  };

  $scope.showOptions = function () {
    var sheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Toggle Favorite'},
        {text: 'Set as Primary'},
        {text: 'Sunrise Sunset Chart'}
      ],
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        if (index === 0) {
          Locations.toggle($stateParams);
        }
        if (index === 1) {
          Locations.primary($stateParams);
        }
        if (index === 2) {
          $scope.showModal();
        }
        return true;
      }
    });
  };

  $scope.showModal = function () {
    if ($scope.modal) {
      $scope.modal.show();
    } else {
      $ionicModal.fromTemplateUrl('views/weather/modal-chart.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
        var days = [];
        var day = Date.now();
        for (var i = 0; i < 365; i++) {
          day += 1000 * 60 * 60 * 24;
          days.push(SunCalc.getTimes(day, $scope.params.lat, $scope.params.lng));
        }
        $scope.chart = days;
        $scope.modal.show();
      });
    }
  };
  $scope.hideModal = function () {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
