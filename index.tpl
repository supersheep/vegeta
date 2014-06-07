<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vegeta</title>
  <link rel="stylesheet" href="css/vegeta.css">

</head>
<body>

<style id="font-style">
  .font{
    float:left;
    width:135px;
    color:#888;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .font i{
    margin-right: 10px;
    cursor: pointer;
  }
</style>

<div class="sample-block" style="padding-top:40px">
<% codepoints.forEach(function(item){ %>
<span class="font">
  <i class="icon-<%=item.name%>"></i>
  <%= translate[item.name] %>
</span>
<% }); %>
</div>
  
</body>
</html>
