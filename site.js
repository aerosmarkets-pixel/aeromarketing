// AeroMarketing shared behaviour
(function(){
  // scroll reveal
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
    });
  },{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rev').forEach(function(el){ io.observe(el); });

  // workflow steps light up in sequence
  var steps = document.querySelectorAll('.flow .step');
  if(steps.length){
    var so = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target;
        var i = parseInt(el.dataset.i,10) || 0;
        setTimeout(function(){ el.classList.add('on'); }, i * 70);
        so.unobserve(el);
      });
    },{threshold:0.3, rootMargin:'0px 0px -60px 0px'});
    steps.forEach(function(el,i){ el.dataset.i = i % 3; so.observe(el); });
  }

  // faq accordion
  document.querySelectorAll('.fq-q').forEach(function(q){
    q.setAttribute('aria-expanded','false');
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.fq').forEach(function(f){
        f.classList.remove('open');
        f.querySelector('.fq-q').setAttribute('aria-expanded','false');
      });
      if(!wasOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();
})();
