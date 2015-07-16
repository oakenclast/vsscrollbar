var sampleapp = angular.module('vssampleapp', ['vsscrollbar']);
sampleapp.controller('vsScrollbarCtrl', function ($scope, vsscrollbarEvent) {

    $scope.visibleItems = [];
    $scope.filterText = '';

    $scope.topIndex = 0;
    $scope.maxIndex = 0;
    $scope.topPos = 0;
    $scope.maxPos = 0;
    $scope.filteredPageCount = 0;
    $scope.filteredItemCount = 0;

    // Scroll change callback
    $scope.onScrollChange = function (topIndex, maxIndex, topPos, maxPos, filteredPageCount, filteredItemCount, visibleItems) {
        $scope.topIndex = topIndex;
        $scope.maxIndex = maxIndex;
        $scope.topPos = topPos;
        $scope.maxPos = maxPos;
        $scope.filteredPageCount = filteredPageCount;
        $scope.filteredItemCount = filteredItemCount;
        $scope.visibleItems = visibleItems;
    };

    // Filtering
    $scope.$watch('filterText', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            // Filter value from all properties (id, code and name) because item is an object
            vsscrollbarEvent.filter($scope, newValue);
        }
    });

    // Generate test items (array of objects)
    var chars = "ABCDEFGHIJKLMNOPQURSTUVWXYZ";
    $scope.allItems = [];
    for (var i = 0; i < 100000; i++) {
        var rndcode = chars.substr(Math.floor(Math.random() * 27), 1) + chars.substr(Math.floor(Math.random() * 27), 1);
        $scope.allItems.push({id: i, code: rndcode, name: 'Item #' + (i + 1)});
    }
});


