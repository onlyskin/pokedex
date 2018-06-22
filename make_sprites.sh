SIZE=$1
GEOMETRY=$SIZE'x'$SIZE'\>'
echo $GEOMETRY
montage 'img/*.png' -geometry 150x150\> -tile 15x -background transparent sprite_sheet.png

# GOOD MONTAGE COMMAND
# montage 'img/*.png' -geometry 150x150\> -tile 15x -background transparent sprite_sheet.png
