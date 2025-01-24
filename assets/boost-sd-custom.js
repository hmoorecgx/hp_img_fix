/*********************** Custom JS for Boost AI Search & Discovery  ************************/
console.log("Running Boost custom JavaScript...");

var addNavigationFilterRun = false;
const customize = {
  addNavigationFilter: (componentRegistry) => {
    componentRegistry.useComponentPlugin("FilterTree", {
      name: "Add Navigation Filter",
      enabled: true,
      apply: () => ({
        afterRender(element) {
          if (!addNavigationFilterRun) {
            try {
              console.log(componentRegistry);
              
              const collectionNavDataElement = document.querySelector('[data-collection-navigation-json]');
              const collectionNavData = collectionNavDataElement 
                ? JSON.parse(collectionNavDataElement.innerHTML) : null;
              
              const filterToolbarElements = document.getElementsByClassName("boost-sd__toolbar-container");
              const filterToolbarElement = filterToolbarElements.item(0);
              
              if (collectionNavData && filterToolbarElement) {
                console.log("Logging collection and navigation data...");
                console.log(collectionNavData);
        
                const navigationFilterElement = document.createElement("div");
                if (collectionNavData.collection_is_promotion) {
                  collectionNavData.navigation.links
                    .filter(function (link) {
                      return link.type === "collection_link";
                    })
                    .forEach(function (link) {
                      
                    });
                }
              }
            } catch (error) {
              console.error(error);
            } finally {
              addNavigationFilterRun = true;
            }
          }
        }
      })
    });
  },
  updatePrices: (componentRegistry) => {
    let formatMoneyHelper;
    
    componentRegistry.useComponentPlugin("ProductItem", {
      name: "Modify Product Prices",
      enabled: false,
      apply: () => ({
        afterRender(element) {
          try {
            // Format Money function
            if (!formatMoneyHelper) {
              const productPriceContext = componentRegistry
                .getChildElmByPath(element, "ProductPrice")
                .getElmRenderContextValue();
              if (productPriceContext.childrenContext.FormatCurrency) {
                const formatMoneElement = Array.isArray(
                  productPriceContext.childrenContext.FormatCurrency
                )
                  ? productPriceContext.childrenContext.FormatCurrency[0]()
                      .element
                  : productPriceContext.childrenContext.FormatCurrency().element;
                if (formatMoneElement) {
                  formatMoneyHelper = formatMoneElement.getHelpers().formatMoney;
                }
              }
            }
  
            if (formatMoneyHelper) {
              // Product data
              let data = element.getParams().props.product;
              
              var newHtml = '';
              let hasCustomPrice = (typeof customPrice !== 'undefined' && typeof customPrice[0] !== 'undefined');
              if (boostSdCustomConfig.isLogged) {
                if (data.compare_at_price_min > data.price_min) {
                    newHtml += '<span class="boost-sd__product-price-content boost-sd__product-price-content--text-align-left">';
                    newHtml += '<span class="boost-sd__format-currency" style="color: ' + boostSDAppConfig.themeSettings.productItems.productInfo.elements.price.salePriceColor + ';">';
                    newHtml += '<span class="">' + formatMoneyHelper(hasCustomPrice ? parseFloat(customPrice[0]['price']) : data.price_min, boostSDAppConfig.shop.money_format, true) + '</span>';
                    newHtml += '</span>';
                  
                    newHtml += '<span class="boost-sd__format-currency boost-sd__format-currency--price-compare" style="color: ' + boostSDAppConfig.themeSettings.productItems.productInfo.elements.price.compareAtPriceColor + ';">';
                    newHtml += '<span class="">' + formatMoneyHelper(data.compare_at_price_min) + '</span>';
                    newHtml += '</span>';
                    newHtml += '</span>';
                } else {
                    newHtml += '<span class="boost-sd__product-price-content boost-sd__product-price-content--text-align-left">';
                    newHtml += '<span class="boost-sd__format-currency" style="color: ' + boostSDAppConfig.themeSettings.productItems.productInfo.elements.price.priceColor + ';">';
                    newHtml += '<span class="">' + formatMoneyHelper(hasCustomPrice ? parseFloat(customPrice[0]['price']) : data.price_min, boostSDAppConfig.shop.money_format, true) + '</span>';
                    newHtml += '</span>';
                }
              } else {
                newHtml += '<span class="boost-sd__product-price-content boost-sd__product-price-content--text-align-left">';
                newHtml += '<span class="boost-sd__format-currency" style="color: ' + boostSDAppConfig.themeSettings.productItems.productInfo.elements.price.priceColor + ';">';
                newHtml += '<span class="">' + "(Login to see price)" + '</span>';
                newHtml += '</span>';
              }
  
              let productItem = data.hasOwnProperty('split_product') ? document.querySelector('[data-product-id="'+ data.variant_id +'"]') : document.querySelector('[id="'+ data.id +'"]');
              productItem.querySelector('.boost-sd__product-price-wrapper').innerHTML = newHtml;
            }
          } catch (error) {
            console.error(error);
          }
        },
      }),
    });
  }
};

window.__BoostCustomization__ = (window.__BoostCustomization__ || []).concat([
  customize.updatePrices,
  customize.addNavigationFilter
]);