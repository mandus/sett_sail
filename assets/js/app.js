// The root-module
var app = angular.module('SettSail', []);

//angular.module('SettSail').controller('BaseCtrl', ['$scope', '$http', function ($scope, $http)
app.controller('BaseCtrl', ['$scope', function ($scope)
{
    // Get over socket:
    // Load initial data:
    io.socket.get('/items', function (data) {
        $scope.items = data;
        // With websocket, we need to apply in order for angular to re-render:
        $scope.$apply();
    });

    // Add on changes in data:
    io.socket.on('items', function (event) {
        console.log("Got event verb: " + event.verb);
        switch (event.verb) {
            case 'created':
                // Just push the new entry will not work, linked entities like
                // owner is not included.
                // $scope.items.push(event.data);
                io.socket.get('/items/' + event.data.id, function (item) {
                    $scope.items.push(item);
                    $scope.$apply();
                });
                break;
            case 'destroyed':
                // Can probably just reset the whole array - angular should
                // do the right (and quick) thing:
                io.socket.get('/items', function (data) {
                    $scope.items = data;
                    $scope.$apply();
                });
                break;
        }

    });

    // Get with ajax:
    // In this case, add $http promise in the angular controller, see the line
    // commented out above.
//    $http.get('/items').then(function (response) {
//        $scope.items = response.data;
//    });

    // Fake data
//    $scope.items = [
//    {
//        id: 1,
//        text: 'a',
//    },
//    {
//        id: 2,
//        text: 'b',
//    }];
}]);


app.controller('AddItemCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.addItem = function() {
        var text = $scope.new_item_text;
        var is_public = $scope.item_is_public;
        var visibility = 'personal';
        if (text == '') {
            console.log('SettSail.AddItemCtrl.addItem: Unable to find data');
            return false;
        }
        
        if (is_public) {
            visibility = 'public';
        }
        $http.post('/items/create', {text: text, visibility: visibility})
            .success(function (data) {
                $scope.new_item_text = '';
                $scope.item_is_public = false;
            });
    };
}]);
