<main 
    class="tab-pane active" 
    ng-if="globalService.currentTab==globalService.tabs.betrPlaceBet.id" 
    ng-controller="betrPlaceBetCtrl" 
    ng-cloak>
    
    to:{{to}}<br/>
    data:{{data}}<br/>

  <!--wallet decrypt-->
  <article class="form-group" ng-show="(!wd && visibility=='interactView')">
      <wallet-decrypt-drtv></wallet-decrypt-drtv>
  </article>

  <article ng-show="visibility=='interactView'">

    @@include( '../includes/contracts-interact-modal.tpl', { "site": "mew" } )

  </article>

    <button class="btn btn-primary btn-block"
            ng-click="generateContractTx()"
            ng-show="!contract.functions[contract.selectedFunc.index].constant">
      <span translate="CONTRACT_Write"> WRITE </span>
    </button>
    
</main>