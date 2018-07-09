<main 
    class="tab-pane active" 
    ng-if="globalService.currentTab==globalService.tabs.betrPlaceBet.id" 
    ng-controller="betrPlaceBetCtrl" 
    ng-cloak>
    to:{{to}}<br/>
    data:{{data}}<br/>
    <wallet-decrypt-drtv></wallet-decrypt-drtv>

    <button class="btn btn-primary btn-block"
            ng-click="generateContractTx()"
            ng-show="!contract.functions[contract.selectedFunc.index].constant">
      <span translate="CONTRACT_Write"> WRITE </span>
    </button>
    
</main>