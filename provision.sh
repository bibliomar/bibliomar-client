LOCALE_URL="https://github.com/bibliomar/locales.git"
LOCALE_FOLDER="locales"

if [ ! -d "$LOCALE_FOLDER" ] ; then
    git clone $LOCALE_URL $LOCALE_FOLDER
else
    cd "$LOCALE_FOLDER"
    git pull $LOCALE_URL
fi