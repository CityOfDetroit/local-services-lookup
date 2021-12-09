'use strict';
import Controller from './components/controller.class';
import './scss/styles.scss';
(function(){
  let controller = new Controller();
  document.getElementById('close-services-btn').addEventListener('click', function(){
    document.getElementById('local-services-results').className = '';
  });
})(window);
