#!/bin/bash
bash --version

# bash ./scripts/shell/package-org-install.sh

# 最新のパッケージバージョンIDを取得
echo ""
echo "sfdx force:package:version:list --packages 0Ho5F000000GmanSAC --json --concise"
sfdx force:package:version:list --packages 0Ho5F000000GmanSAC --concise
LIST_JSON=`sfdx force:package:version:list --packages 0Ho5F000000GmanSAC --json --concise`

##### 実行結果から必要な情報を変数に格納する方法要確認
LIST_LENGTH=`echo $LIST_JSON |  jq '.result | length'`
for i in $( seq 0 $(($LIST_LENGTH - 1)) ); do
  SubscriberPackageVersionId=`echo $LIST_JSON | jq -r .result[$i].SubscriberPackageVersionId`
done
echo " >>>sfdx force:package:install SubscriberPackageVersionId:" $SubscriberPackageVersionId
echo ""

# スクラッチ組織にインストールしたパッケージを表示
echo ""
echo "sfdx force:package:installed:list -u cmflow-package-install-scratch --json"
sfdx force:package:installed:list -u cmflow-package-install-scratch
INSTALLED_JSON=`sfdx force:package:installed:list -u cmflow-package-install-scratch --json`
InstalledPackageVersionId="--none--"
INSTALLED_LENGTH=`echo $INSTALLED_JSON |  jq '.result | length'`
for i in $( seq 0 $(($INSTALLED_LENGTH - 1)) ); do
  InstalledSubscriberPackageName=`echo $INSTALLED_JSON | jq -r .result[$i].SubscriberPackageName`
  if [ "$InstalledSubscriberPackageName" = "CM Flow Components" ]; then
    InstalledPackageVersionId=`echo $INSTALLED_JSON | jq -r .result[$i].SubscriberPackageVersionId`
  fi
done

if [ $InstalledPackageVersionId = $SubscriberPackageVersionId ] ; then
  echo ""
  echo "最新のパッケージがインストール用スクラッチ組織へインストールされています。"
elif [ $InstalledPackageVersionId = "--none--" ] ; then
  echo ""
  echo "スクラッチ組織へパッケージがインストールされていないため、インストールします。"
  echo ""
  echo "sfdx force:package:install --package $SubscriberPackageVersionId -u cmflow-package-install-scratch --wait 10 --publishwait 10"
  sfdx force:package:install --package $SubscriberPackageVersionId -u cmflow-package-install-scratch --wait 10 --publishwait 10
else
  echo ""
  echo "古いパッケージがインストール用スクラッチ組織へインストールされているため、アンインストールしてからインストールします。"
  echo ""
  echo "sfdx force:package:uninstall --package $InstalledPackageVersionId -u cmflow-package-install-scratch --wait 10"
  sfdx force:package:uninstall --package $InstalledPackageVersionId -u cmflow-package-install-scratch --wait 10
  echo ""
  echo "sfdx force:package:install --package $SubscriberPackageVersionId -u cmflow-package-install-scratch --wait 10 --publishwait 10"
  sfdx force:package:install --package $SubscriberPackageVersionId -u cmflow-package-install-scratch --wait 10 --publishwait 10
fi
