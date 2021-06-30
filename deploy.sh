echo "Iniciando deployment..." &&
pushd ./backend &&
echo "Exportando dependencias del backend..." &&
poetry export -f requirements.txt -o requirements.txt &&
popd &&
pushd ./frontend &&
echo "Instalando dependencias del frontend para realizar build..." &&
yarn &&
echo "Buildeando frontend..." &&
yarn build &&
popd &&
echo "Deployment en Cloud Foundry..." &&
ibmcloud cf push &&
rm ./backend/requirements.txt &&
echo "Deployment finalizado."
