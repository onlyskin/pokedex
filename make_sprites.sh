SIZE=$1
montage 'img/*.png' -geometry $SIZEx$SIZE -tile 15x -background transparent sprite_sheet.png
