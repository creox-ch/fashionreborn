/* FASHION REBORN — единая навигация независимого сайта маркета. */
window.FP_NAV = function (active) {
  var links = [
    { key: "market", label: "Маркет", href: "/" },
    { key: "catalog", label: "Каталог", href: "/market-catalog" },
    { key: "philosophy", label: "Философия", href: "/brand-market-philosophy" },
    { key: "authenticity", label: "Проверка подлинности", href: "/brand-market-authenticity" },
    { key: "terms", label: "Условия участия", href: "/brand-market-agb" },
  ];
  return links.map(function (link) {
    return { label: link.label, href: link.href, active: link.key === active || undefined };
  });
};
