<main 
    class="tab-pane active" 
    ng-if="globalService.currentTab==globalService.tabs.betrPlaceBet.id" 
    ng-controller="betrPlaceBetCtrl" 
    ng-cloak>
    
    <!--
    to:{{to}}<br/>
    data:{{data}}<br/>
    -->

  <!--wallet decrypt-->
  <article ng-show="visibility=='interactView' && !qs">
      @@include( '../includes/betr-faq.tpl', { "site": "mew" } )
  </article>

  <article class="form-group" ng-show="visibility=='interactView' && qs">
      <wallet-decrypt-drtv></wallet-decrypt-drtv>
  </article>
  
  <!-- <article ng-show="visibility=='interactView'"> -->
  <article ng-show="visibility=='interactView' && qs">

    @@include( '../includes/contracts-interact-modal.tpl', { "site": "mew" } )

  </article>

    <button class="btn btn-primary btn-block"
            ng-click="generateContractTx()"
            ng-hide="!escrowAllow"
            ng-show="!contract.functions[contract.selectedFunc.index].constant && qs">
      <span translate="CONTRACT_Write"> WRITE </span>
    </button>
    
</main>