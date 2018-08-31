'use strict';
var betrPlaceBetCtrl = function($scope, $sce, walletService, $rootScope) {
    walletService.wallet = null
    $scope.visibility = 'interactView'
    $scope.sendContractModal = new Modal(document.getElementById('sendContract'))
    $scope.wallet = walletService.wallet
    $scope.qs = false
    $scope.ajaxReq = ajaxReq;

    $scope.escrowAllow = false;
    $scope.showSetEscrowBtn = false;
    $scope.accountAddress = null;

    $scope.modalMsg = null;
    $scope.showBetSuccessModal = false;
    $scope.modalHeader = null;
    $scope.modalCallback = null;

    $rootScope.$on("setEscrow", function(e, shouldShowModal){
        $scope.escrowAllow = true;
        $scope.showSetEscrowBtn = false;
        if (shouldShowModal) $scope.showSuccessModalEscrow();
        $scope.$apply();
    });
    $rootScope.$on("showEscrowBtn", function(){
        $scope.showSetEscrowBtn = true;
        $scope.escrowAllow = false;
        $scope.$apply();
    });

    var qs = globalFuncs.urlGet('qs') == null ? "" : globalFuncs.urlGet('qs')
    var stake = globalFuncs.urlGet('stake') == null ? "" : globalFuncs.urlGet('stake')
    if (!qs || !stake) return
    try {
        qs = JSON.parse(qs.replace(/\'/g, '\"'))
    } catch(e) {
        $scope.notifier.danger(e);
    }
    $scope.stake = stake
    $scope.qs = true

    const underscoreIndex = qs.params[0].data.indexOf('_')
    if (underscoreIndex != -1) qs.params[0].data = qs.params[0].data.substring(0, underscoreIndex);

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

    $scope.closeBetSuccessModal = function() {
        $scope.showBetSuccessModal = false
    }

    $scope.setEscrowFlag = function() {
        $rootScope.$broadcast('callSetEscrowMethod');
        $scope.showSetEscrowBtn = false;
    }

    $scope.generateContractTx = function() {
        $scope.wd = true
        $scope.wallet = walletService.wallet
        // $scope.sendContractModal.open()
        $scope.tx.gasLimit = 900000
        $scope.generateTx()
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
        uiFuncs.generateTx(txData, function(rawTx) {
            if (!rawTx.isError) {
                $scope.rawTx = rawTx.rawTx
                $scope.signedTx = rawTx.signedTx
                $scope.showRaw = true
                $scope.sendTx()
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
        $scope.sendContractModal.close();
        uiFuncs.sendTx($scope.signedTx, function(resp) {
            if (!resp.isError) {
                // var bExStr = $scope.ajaxReq.type != nodes.nodeTypes.Custom ? "<a href='" + $scope.ajaxReq.blockExplorerTX.replace("[[txHash]]", resp.data) + "' target='_blank' rel='noopener'> View your transaction </a>" : '';
                // var contractAddr = $scope.tx.contractAddr != '' ? " & Contract Address <a href='" + ajaxReq.blockExplorerAddr.replace('[[address]]', $scope.tx.contractAddr) + "' target='_blank' rel='noopener'>" + $scope.tx.contractAddr + "</a>" : '';
                // $scope.notifier.success(globalFuncs.successMsgs[2] + "<br />" + resp.data + "<br />" + bExStr + contractAddr);
                
                $scope.showSuccessModalBet();
                $scope.notifier.success('Wallet Response' + '<br/>' + globalFuncs.successMsgs[7]);
            } else {
                $scope.notifier.danger(resp.error);
            }
        })
    }

    $scope.showSuccessModalBet = function () {
        $scope.showBetSuccessModal = true;
        $scope.modalHeader = "Transaction submitted";
        $scope.modalMsg = "Go to your wallet Transaction History to see Transaction confirmation";
        $scope.modalCallback = function () {
            window.location = window.location.href.replace(window.location.search, '');
        }
    }

    $scope.showSuccessModalEscrow = function () {
        $scope.showBetSuccessModal = true;
        $scope.modalHeader = null;
        $scope.modalMsg = "BETR betting support is enabled for your wallet";
        $scope.modalCallback = function () {
            $scope.showBetSuccessModal = false;
        }
    }
}

module.exports = betrPlaceBetCtrl;