'use strict';
var betrPlaceBetCtrl = function($scope, $sce, walletService) {
    $scope.visibility = 'interactView'
    $scope.sendContractModal = new Modal(document.getElementById('sendContract'))
    
    var qs = globalFuncs.urlGet('qs') == null ? "" : globalFuncs.urlGet('qs')
    try {
        qs = JSON.parse(qs.replace(/\'/g, '\"'))
    } catch(e) {
        $scope.notifier.danger(e)
    }
    $scope.data = qs.params[0].data
    $scope.to = qs.params[0].to

    $scope.generateContractTx = function() {
        $scope.wd = true
        $scope.sendContractModal.open()
    }
}

module.exports = betrPlaceBetCtrl;