export interface Routes {
  /**
   * config & session
   */
  config?: string;
  session?: string;
  /**
   * account
   */
  accountEmail?: string;
  accountPassword?: string;
  /**
   * auth
   */
  authLogin?: string;
  authLogout?: string;
  authUser?: string;
  /**
   * media
   */
  mediaFilter: string;
  mediaDelete: string;
  mediaDetail: string;
  mediaPublicStatus: string;
  mediaUpload?: string;
  /**
   * page
   */
  pageIndex?: string;
  pageMove?: string;
  pageDetail?: string;
  pageVersionIndex?: string;
  pageVersionDetail?: string;

  /*
  flatPagesIndex?: string;
  pageAdd?: string;
  pageCreateSchema?: string;
  pageNavigationIndex?: string;
  pageNavigationSave?: string;
  pageSort?: string;
  pageVersionCreate?: string;
  pageVersionDetail?: string;
  pageVersionReplace?: string;
  */

  /**
   * resource
   */
  resourceCreate?: string;
  resourceCreateDetail?: string;
  resourceDelete?: string;
  resourceDetail?: string;
  resourceIndex?: string;
  resourceUpdate?: string;
  /**
   * translation
   */
  translationCatalogue?: string;
  translationDetail?: string;
  translationIndex?: string;
  translationSave?: string;

  [key: string]: string;
}



