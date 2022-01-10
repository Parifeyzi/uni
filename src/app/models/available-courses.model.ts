import {Teacher} from "./teacher.model";

export class AvailableCourses {
  public id?: string;
  public teacher_id?: string;
  public title?: string;
  public unit?: string;
  public description?: string;
  public cover?: string;
  public created_at?: string;
  public updated_at?: string;
  public teacher?: Teacher;
}
