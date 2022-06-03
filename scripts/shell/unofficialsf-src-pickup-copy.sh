#!/bin/bash
bash --version

# bash ./scripts/shell/unofficialsf-src-pickup-copy.sh
# このスクリプトでは以下の作業を行う
#   1.co-meeting/LightningFlowComponentsの内容をreleasetag指定して一時フォルダにclone
#   2.必要なソース一部だけを管理パッケージ作成に必要なフォルダにコピー
#   3.一部のファイルを抜粋して置換処理を行う
#   4.一時フォルダ(cloneしたものが格納されている)を削除する


# ============================================
# co-meeting/LightningFlowComponentsの内容をreleasetag指定して一時フォルダにclone
mkdir tmp_clone_dir
cd tmp_clone_dir
git clone git@github.com:co-meeting/LightningFlowComponents.git -b 2022-04-01
cd ..

# ============================================
# 必要なソース一部だけを管理パッケージ作成に必要なフォルダにコピー
rm -rf force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes
mkdir force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes

### ■ FieldPickerController
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldPickerController.cls
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldPickerController.cls
cp $COPY_SOURCE $COPY_TARGET
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldPickerController.cls-meta.xml
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldPickerController.cls-meta.xml
cp $COPY_SOURCE $COPY_TARGET

### ■ FieldPickerControllerTest
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldPickerControllerTest.cls
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldPickerControllerTest.cls
cp $COPY_SOURCE $COPY_TARGET
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldPickerControllerTest.cls-meta.xml
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldPickerControllerTest.cls-meta.xml
cp $COPY_SOURCE $COPY_TARGET

### ■ FieldSelectorController
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldSelectorController.cls
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldSelectorController.cls
cp $COPY_SOURCE $COPY_TARGET
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldSelectorController.cls-meta.xml
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldSelectorController.cls-meta.xml
cp $COPY_SOURCE $COPY_TARGET

### ■ FieldSelectorControllerTest
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldSelectorControllerTest.cls
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldSelectorControllerTest.cls
cp $COPY_SOURCE $COPY_TARGET
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_action_components/FlowActionsBasePack/force-app/main/default/classes/FieldSelectorControllerTest.cls-meta.xml
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowActionsBasePack/classes/FieldSelectorControllerTest.cls-meta.xml
cp $COPY_SOURCE $COPY_TARGET

### ■ CustomLabels
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/labels
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/labels

COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/labels/CustomLabels.labels-meta.xml
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/labels/CustomLabels.labels-meta.xml
cp $COPY_SOURCE $COPY_TARGET

### ■ fsc_fieldSelector
# https://github.com/alexed1/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_fieldSelector/
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_fieldSelector
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_fieldSelector
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_fieldSelector
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc
cp -r $COPY_SOURCE $COPY_TARGET

### ■ fsc_flowCombobox
# https://github.com/alexed1/LightningFlowComponents/tree/master/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_flowCombobox
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_flowCombobox
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_flowCombobox
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_flowCombobox
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc
cp -r $COPY_SOURCE $COPY_TARGET

### ■ fsc_flowComboboxUtils
# https://github.com/alexed1/LightningFlowComponents/tree/master/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_flowComboboxUtils
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_flowComboboxUtils
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_flowComboboxUtils
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_flowComboboxUtils
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc
cp -r $COPY_SOURCE $COPY_TARGET

### ■ fsc_pickObjectAndField
# https://github.com/alexed1/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_pickObjectAndField/
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_pickObjectAndField
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc
cp -r $COPY_SOURCE $COPY_TARGET

### ■ fsc_pickObjectAndFieldUtils
# https://github.com/alexed1/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_pickObjectAndFieldUtils/
rm -rf force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndFieldUtils
mkdir force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndFieldUtils
COPY_SOURCE=tmp_clone_dir/LightningFlowComponents/flow_screen_components/FlowScreenComponentsBasePack/force-app/main/default/lwc/fsc_pickObjectAndFieldUtils
COPY_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc
cp -r $COPY_SOURCE $COPY_TARGET

# ============================================
# 一部のファイルを抜粋して置換処理を行う
# (fsc_pickObjectAndFieldのJSファイルとメタファイルの一部データを修正)
### force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_fieldSelector/fsc_fieldSelector.js
#### 名前空間「usf」の除外
###### import getObjectFields from '@salesforce/apex/usf.FieldSelectorController.getObjectFields';
######     ↓
###### import getObjectFields from '@salesforce/apex/FieldSelectorController.getObjectFields';
REPLACE_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_fieldSelector/fsc_fieldSelector.js
sed -i.bak -e 's/usf.FieldSelectorController.getObjectFields/FieldSelectorController.getObjectFields/g' $REPLACE_TARGET
rm "$REPLACE_TARGET.bak"

### force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField/fsc_pickObjectAndField.js
#### 名前空間「usf」の除外
###### import getObjects from '@salesforce/apex/usf.FieldPickerController.getObjects'; // Requires Greater Than v2.6
######     ↓
###### import getObjects from '@salesforce/apex/FieldPickerController.getObjects'; // Requires Greater Than v2.6
REPLACE_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField/fsc_pickObjectAndField.js
sed -i.bak -e 's/usf.FieldPickerController.getObjects/FieldPickerController.getObjects/g' $REPLACE_TARGET
rm "$REPLACE_TARGET.bak"

### force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField/fsc_pickObjectAndField.js-meta.xml
#### 展開モードを除外
###### <isExposed>true</isExposed>
######     ↓
###### <isExposed>false</isExposed>
REPLACE_TARGET=force-app/managed/main/UnofficialSF/FlowScreenComponentsBasePack/lwc/fsc_pickObjectAndField/fsc_pickObjectAndField.js-meta.xml
sed -i.bak -e 's/\<isExposed\>true\<\/isExposed\>/\<isExposed\>false\<\/isExposed\>/g' $REPLACE_TARGET
rm "$REPLACE_TARGET.bak"
# ============================================
# cloneしたものが格納されている一時フォルダを削除する

rm -rf tmp_clone_dir
