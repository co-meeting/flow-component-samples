import { track } from 'lwc';

/**
 * c-custom-datatableにページングを追加します。
 * ページングは初期ロードで指定件数を読み込み、ページングで表示件数を増やす形で実装しています。
 * 以下のように利用します。
 *
 * ```
 * import { CustomDatatableMixin } from 'c/customDatatableUtil';
 * export default class CustomRelationList extends CustomDatatableMixin(LightningElement) {
 * ```
 *
 * 以下のtracked propertyが追加されます。
 * * records
 *
 * 以下のprivate propertyが追加されます。
 * * recordSizePerPage
 * * hasMoreRecords
 * * isLoadingMore
 * * allRecords
 * * loadedRecordIndex
 *
 * 必要に応じて以下のプロパティのデフォルト値をconstructorで設定する
 * * recordSizePerPage: デフォルトは100
 *
 * @param {*} base
 */
const CustomDatatableMixin = (base) =>
  class CustomDatatable extends base {
    @track records;

    // 1ページに表示するレコード件数
    recordSizePerPage = 100;
    // 全件
    allRecords;
    // 表示中のINDEX
    loadedRecordIndex = 0;
    // まだ表示できるレコードが存在するか
    hasMoreRecords = false;
    // ローディング中の有無
    isLoadingMore = false;

    /**
     * 読み込んだレコード一覧に初期処理を行う。
     * ページサイズに合わせたスライス処理
     *
     * @param {*} allRecords
     * @param {*} defaultSizePerPage
     */
    initRecords(allRecords, defaultSizePerPage) {
      this.allRecords = allRecords || [];
      this.recordSizePerPage = defaultSizePerPage || 100;
      this.records = this.allRecords.slice(0, this.recordSizePerPage);
      this.loadedRecordIndex = this.records.length;
      this.hasMoreRecords = this.loadedRecordIndex < this.allRecords.length;
      this.recalculateDisplayRange();
    }

    /**
     * レコード表示範囲の再計算
     * 現在ロード済みのレコード総数を元に、ページ番号を求めて、
     * 再表示が必要なレコードがあれば上限に収まるよう追加表示
     */
    recalculateDisplayRange() {
      const nowDisplayPage = Math.ceil(this.loadedRecordIndex / this.recordSizePerPage);
      const lastIndex = this.recordSizePerPage * nowDisplayPage;
      this.loadMore(lastIndex);
    }

    /**
     * 次のページ分のレコードをthis.recordsに追加する。
     */
    handleLoadMore() {
      const lastIndex = this.loadedRecordIndex + this.recordSizePerPage;
      this.loadMore(lastIndex);
    }

    /**
     * 残り全てのレコードをthis.recordsに追加する。
     */
    handleLoadAll() {
      const lastIndex = this.allRecords.length;
      this.loadMore(lastIndex);
    }

    /**
     * 指定レコード位置までのレコードをthis.recordsに追加する。
     */
    loadMore(lastIndex) {
      if (this.isLoadingMore) {
        return;
      }
      if (!this.hasMoreRecords) {
        return;
      }
      this.isLoadingMore = true;
      const nextRecords = this.allRecords.slice(this.loadedRecordIndex, lastIndex);
      this.records = this.records.concat(nextRecords);
      this.loadedRecordIndex = this.records.length;
      this.hasMoreRecords = this.loadedRecordIndex < this.allRecords.length;
      this.isLoadingMore = false;
    }

    /**
     * レコードが0件だったらtrueを返す
     */
    get hasNoRecords() {
      return this.records && this.records.length === 0;
    }
  };

export { CustomDatatableMixin };
