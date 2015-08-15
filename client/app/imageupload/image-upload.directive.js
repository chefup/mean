'use strict';

angular.module('chefupApp')
  .directive('imageUpload', ['$modal', 'cloudinary', '$upload',
    function($modal, Cloudinary, $upload) {
      return {
        restrict: 'E',
        templateUrl: 'app/imageupload/image-upload.html',
        scope: {
          images: '=',
          type: '@'
        },
        link: function($scope, element, attrs) {
          if (!$scope.type) {
            $scope.type = 'photos';
          }
          $scope.dragOverClass = function($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
              for (var i = 0; i < items.length; i++) {
                if (items[i].kind == 'file') {
                  hasFile = true;
                  break;
                }
              }
            } else {
              hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
          };
          $scope.$watch('files', function() {
            if (!$scope.files) return;
            $scope.images = [];
            $scope.files.forEach(function(file) {
              $scope.upload = $upload.upload({
                url: "https://api.cloudinary.com/v1_1/" + Cloudinary.cloud + "/upload",
                data: {
                  upload_preset: Cloudinary.preset
                },
                file: file
              }).progress(function(e) {
                file.progress = Math.round((e.loaded * 100.0) / e.total);
                file.status = "Uploading... " + file.progress + "%";
              }).success(function(data, status, headers, config) {
                file.result = data;
                $scope.images.push(data.url);
              });
            });
          });
        }
      };
    }
  ]);