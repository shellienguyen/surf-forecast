document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

var instance = M.FormSelect.getInstance(elem);

instance.getSelectedValues("")