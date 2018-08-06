'use strict';
var betrPlaceBetCtrl = function($scope, $sce, walletService) {
    walletService.wallet = null
    $scope.visibility = 'interactView'
    $scope.sendContractModal = new Modal(document.getElementById('sendContract'))
    $scope.wallet = walletService.wallet

    var qs = globalFuncs.urlGet('qs') == null ? "" : globalFuncs.urlGet('qs')
    if (!qs) return
    try {
        qs = JSON.parse(qs.replace(/\'/g, '\"'))
    } catch(e) {
        $scope.notifier.danger(e);
    }
    
    $scope.data = qs.params[0].data
    $scope.to = qs.params[0].to
    $scope.tx = {
        gasLimit: '',
        data: qs.params[0].data,
        to: qs.params[0].to,
        unit: "ether",
        value: 0,
        nonce: null,
        gasPrice: null
    }
    $scope.generateContractTx = function() {
        $scope.wd = true
        $scope.wallet = walletService.wallet
        $scope.sendContractModal.open()
    }

    $scope.generateTx = function() {
        try {
            if ($scope.wallet == null) throw globalFuncs.errorMsgs[3]
        } catch (e) {
            $scope.notifier.danger(e);
        }
        $scope.tx.contractAddr = qs.params[0].to
        $scope.tx.data = ethFuncs.sanitizeHex($scope.tx.data)
        var txData = uiFuncs.getTxData($scope)
        console.log(txData)
        uiFuncs.generateTx(txData, function(rawTx) {
            if (!rawTx.isError) {
                $scope.rawTx = rawTx.rawTx
                $scope.signedTx = rawTx.signedTx
                $scope.showRaw = true
            } else {
                $scope.showRaw = false
                $scope.notifier.danger(rawTx.error)
            }
            if (!$scope.$$phase) $scope.$apply()
        })
    }

    $scope.sendTx = function() {
        $scope.sendContractModal = new Modal(document.getElementById('sendContract'))
        // $scope.sendTxModal.close();
        console.log('HERE')
        $scope.sendContractModal.close();
        uiFuncs.sendTx($scope.signedTx, function(resp) {
            if (!resp.isError) {
                var bExStr = $scope.ajaxReq.type != nodes.nodeTypes.Custom ? "<a href='" + $scope.ajaxReq.blockExplorerTX.replace("[[txHash]]", resp.data) + "' target='_blank' rel='noopener'> View your transaction </a>" : '';
                var contractAddr = $scope.tx.contractAddr != '' ? " & Contract Address <a href='" + ajaxReq.blockExplorerAddr.replace('[[address]]', $scope.tx.contractAddr) + "' target='_blank' rel='noopener'>" + $scope.tx.contractAddr + "</a>" : '';
                $scope.notifier.success(globalFuncs.successMsgs[2] + "<br />" + resp.data + "<br />" + bExStr + contractAddr);
            } else {
                $scope.notifier.danger(resp.error);
            }
        })
    }
}

module.exports = betrPlaceBetCtrl;