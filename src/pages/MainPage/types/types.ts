/*--------------------Map------------------  */

export interface MapStyleProps {
  match1: number;
  match2: number;
}

export interface MapComponentProps {
  id: number;
  name: string;
}

/*--------------------Map--------------------*/

/*------------------Loading------------------*/

export interface LoadingStyleProps {
  loading: string;
}

/*------------------Loading------------------*/

/*--------------------App--------------------*/

export interface AppMoveStyleProps {
  moveNumber: number;
}

/*--------------------App--------------------*/

/*--------------------Top--------------------*/

export interface TopStyleProps {
  componentIndex: number;
  propsIndex: number;
  mosPos?: number[];
  isMouseMove?: boolean;
}

/*--------------------Top--------------------*/

/*---------------TextAndImages---------------*/

export interface TextformProps {
  indexMatch: boolean;
  headText: string;
  summaryText: string;
  position?: string;
  pageIndex?: number;
  page?: {
    isPageMove: boolean;
  };
}

export interface TextAndImageStyleProps {
  isMatch: boolean;
  animationOn?: boolean;
  pageRender?: boolean;
  pageChange?: boolean;
}

export interface TextContainerStyleProps {
  position: string | null;
}

export interface ImageformProps {
  indexMatch: boolean;
  imageSrc: string;
  pageIndex?: number;
  pageRender?: boolean;
  page?: {
    isPageMove: boolean;
    page: number;
  };
}

export interface ImgStyleProps {
  pageChange: boolean;
}

export interface NumberformProps {
  indexMatch: boolean;
  number: string;
  pageIndex?: number;
  pageRender?: boolean;
}

export interface NumberOrderStyleProps {
  isMatch: boolean;
  animationOn?: boolean;
}

/*---------------TextAndImages---------------*/

/*-------------ProjectPageStyle--------------*/

export interface ProjectPageStyleProps {
  pageRender: boolean;
}

/*-------------ProjectPageStyle--------------*/

/*--------------------All--------------------*/

export interface AllComponentProps {
  index: number;
}

/*--------------------All--------------------*/
