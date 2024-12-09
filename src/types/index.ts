export interface DocumentPage {
  id: string;
  imageData: string;
  processed: boolean;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}