<h2>My Phonebook</h2>

<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

<ul id="myUL">
  <li><a href="#adele">Adele</a></li>
  <li><a href="#agnes">Agnes</a></li>

  <li><a href="#billy">Billy</a></li>
  <li><a href="#bob">Bob</a></li>

  <li><a href="#calvin">Calvin</a></li>
  <li><a href="#chris">Christina</a></li>
  <li><a href="#cindy">Cindy</a></li>
</ul>

<script>
    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
</script>

