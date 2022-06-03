# Flow Component Samples

Flow Component Samples は、カスタム画面フローコンポーネントのコードサンプル集です。標準では提供されていないあると便利なコンポーネントを作成してみました。一部のコンポーネントはカスタムプロパティエディタも実装しています。 ロック解除済みパッケージとしても公開しているので、すぐにインストールして試すこともできます。

## 機能一覧

| 機能                                   | 内容                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CmOutputField （表示用コンポーネント） | レコードと項目を指定するだけで標準の Lightning と同じ形式で出力できるコンポーネントです。住所は地図リンクになり URL はリンクをクリックで画面遷移できる仕組みとなります。 |
| CmTable （入力表示用コンポーネント）   | レコード一覧を指定するだけ簡単にテーブル表示できるコンポーネントです。チェックボックス表示の ON/OFF 機能もあるので入力用にも使えます。                                   |
| CmBorder （表示用コンポーネント）      | 画面フローに区切り用の線を引きたいと思った時に利用できるコンポーネントです。何も指定しなくてもシンプルな灰色の線を追加できます。色やサイズ、太さなど調整可能です。       |

## パッケージインストール URL

以下の URL を実行して指定の組織にインストールしてください。

#### 本番組織にインストールする

https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5F000000Io1RQAS

#### sandbox 組織にインストールする

https://test.salesforce.com/packaging/installPackage.apexp?p0=04t5F000000Io1RQAS

## ファイルフォルダ構造

```
root
├── config/
│   └── data/                 … サンプルデータ格納
├── scripts/                   … スクリプトファイル格納
└── force-app/                 … 組織にデプロイするソースコード格納
     ├── managed               … パッケージ内に格納するソースコード格納
     │     ├── CmBorder/      … CmBorderコンポーネントの関連コード格納
     │     ├── CmOutputField/ … CmOutputFieldコンポーネントの関連コード格納
     │     ├── CmTable/       … CmTableコンポーネントの関連コード格納
     │     └── UnofficialSF/  … カスタムプロパティエディタで使用しているUnofficialSFのコード格納
     └── unmanaged             … パッケージに格納しない開発時に扱うソースコード格納

```

## 構築手順

以下の対応は事前に行なっているものとする

- DevHub 組織の設定
  - [ロック解除済みパッケージと第二世代管理パッケージを有効化](https://developer.salesforce.com/docs/atlas.ja-jp.230.0.sfdx_dev.meta/sfdx_dev/sfdx_setup_enable_secondgen_pkg.htm)

### 1.ソースコードを clone

```
git clone git@github.com:co-meeting/flow-component-samples.git
cd flow-component-samples
```

### 2.DevHub 組織認証

スクラッチ組織が作成できるように DevHub 組織を認証

```
sfdx force:auth:web:login --setdefaultdevhubusername -a cm-devhub
```

制限チェック用

```
sfdx force:limits:api:display -u cm-devhub
```

npm パッケージのインストール

```
npm install
```

LWC テスト用の環境をセットアップ

```
sfdx force:lightning:lwc:test:setup
```

## 開発 Tips

### スクラッチ組織新規作成

```
npm run setup
```

※スクラッチ組織の作成に失敗したら、devhub 組織の作成可能な有効なスクラッチ組織数を確認してみること。不要なスクラッチ組織があったら削除する

### スクラッチ組織再作成

```
npm run setupd
```

### 作成したスクラッチ組織を Web ページで開く

```
npm run org:open
```

### 作成したスクラッチ組織の管理者ユーザーのパスワードを発行する

```
npm run org:user:password:generate
```

### スクラッチ組織へソースをデプロイ(Push)

```
npm run deploy
```

### Apex テストの実行

```
npm run test:apex
```

### ロック解除済みパッケージ作成（初回のみ)

```
sfdx force:package:create --name "Flow Component Samples"  --path force-app/managed --packagetype Unlocked
```

`scripts/shell/package-org-install.sh`を開き、発行されたパッケージ ID に変更する。

### パッケージバージョン作成

sfdx-project.json を開き、以下のプロパティをリリース状況に応じて変更

```
            "versionName": "ver 0.1",
            "versionNumber": "0.1.0.NEXT"
```

以下コマンドを実行してパッケージバージョンを作成する

```
npm run package:version:create
```

### 作成したパッケージバージョンリストの確認

```
npm run package:version:list
```

### パッケージインストール用スクラッチ組織の作成

```
npm run package:org:create
```

### パッケージインストール用スクラッチ組織の削除

```
npm run package:org:delete
```

### パッケージインストール用スクラッチ組織へのインストール

このコマンドを実行する前に、`scripts/shell/package-org-install.sh`を開き、パッケージ ID が正しいか確認すること
最新のパッケージをインストール用スクラッチ組織へインストール
古いパッケージバージョンがあればアンインストールしてインストールする

```
npm run package:org:install
```

### パッケージインストール用スクラッチ組織を開く

```
npm run package:org:open
```

### パッケージインストール用スクラッチ組織以外にインストールしたい場合

以下の URL の`<パッケージバージョンID>`を置換して、ブラウザのアドレスバーに URL を貼り付けて、パッケージをインストールする。

```
// 本番組織にインストールする用URL
https://login.salesforce.com/packaging/installPackage.apexp?p0=<パッケージバージョンID>

// sandbox組織にインストールする用URL
https://test.salesforce.com/packaging/installPackage.apexp?p0=<パッケージバージョンID>
```

※`<パッケージバージョン ID>`：`sfdx-project.json`を開き、`packageAliases`記載の パッケージバージョン ID を使って、パッケージインストール用の URL を手動で作成してください。

## License

MIT License
[LICENSE](LICENSE)

#### 一部 `BSD 3-Clause License`　です。

- [Flow Combobox](https://unofficialsf.com/develop-custom-property-editors-quickly-with-flowcombobox/)
- [Object and Field Picker](https://unofficialsf.com/add-an-object-and-field-picklist-pair-to-your-flow/)

Flow Component Samples では、 [Flow Action and Screen Component BasePacks – UnofficialSF](https://unofficialsf.com/flow-action-and-screen-component-basepacks/) にて、 [Alex Edelstein](https://unofficialsf.com/author/alexed1000/) が公開してくれている以下サポートツールのソースコードを、CmOutputField コンポーネントのカスタムプロパティエディタ構築の際に利用してます。
該当ソースコード(`force-app/managed/main/UnofficialSF`)は名前空間以外、そのまま改変せず利用しており、当フォルダ配下は`BSD 3-Clause License`です。

License:
BSD 3-Clause License, https://github.com/alexed1/LightningFlowComponents/blob/master/LICENSE

Source:
https://github.com/alexed1/LightningFlowComponents/
