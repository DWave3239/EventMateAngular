ng build --prod --output-path docs --base-href "https://DWave3239.github.io/EventMateAngular/"
copy docs\index.html docs\404.html
git add *
git commit -m $1
git push