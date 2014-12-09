    var map = L.map('map')
      .setView([41.8947, -87.6105],10)

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png').addTo(map)