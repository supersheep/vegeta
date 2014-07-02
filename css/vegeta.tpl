@font-face {
  font-family: 'vegeta';
  src:url('../src/fonts/vegeta.eot');
  src:url('../src/fonts/vegeta.eot?#iefix-vucqk5') format('embedded-opentype'), url('../src/fonts/vegeta.woff') format('woff'), url('../src/fonts/vegeta.ttf') format('truetype'), url('../src/fonts/vegeta.svg#vegeta') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  font-family: 'vegeta';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

<% codepoints.forEach(function(item){ %>
.icon-<%= item.name %>:before {
  content: "\<%= item.codepoint.toString(16) %>";
}
<% }); %>