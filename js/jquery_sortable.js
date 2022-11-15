import Sortable from '/node_modules/sortablejs/modular/sortable.complete.esm.js';

$(function() {
  var el = document.getElementById('images-list');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list'
  });

  var el = document.getElementById('s-tier');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list',
  });

  var el = document.getElementById('a-tier');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list'
  });

  var el = document.getElementById('b-tier');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list'
  });

  var el = document.getElementById('c-tier');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list'
  });

  var el = document.getElementById('d-tier');
  new Sortable(el, {
    animation: 200,
    swapThreshold: 1,
    dragClass: "sortable-drag",
    group: 'list'
  });

  $(".tier-images").mouseleave(function() {
    $(this).css('z-index', 0);
  });

  $(".tier-images").mousedown(function() {
    $(this).css('transition', 'transform ease-in-out 0.2s');
    $(this).css('transform', 'scale(' + 2 + ')');
    $(this).css('z-index', 2);
  });
  
  $(".tier-images").mouseup(function() {
    $(this).css('transition', 'all ease-in-out 0.2s');
    $(this).css('transform', 'scale(' + 1 + ')');
    $(this).css('z-index', 0);
  });

  
});

