const candidateColumns = {
  id: { type: String, require: true },
  name: { type: String, require: true },
  document: { type: Number, require: true },
  cv_zonajobs: { type: String, require: true },
  cv_bumeran: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  date: { type: Date, require: true },
  age: { type: Number, require: true },
  has_university: { type: Boolean, require: true },
  career: { type: String, require: true },
  graduated: { type: String, require: true },
  courses_approved: { type: String, require: true },
  location: { type: String, require: true },
  accepts_working_hours: { type: Boolean, require: true },
  desired_salary: { type: Number, require: true },
  had_interview: { type: Boolean, require: true },
  reason: { type: String, require: true },
  reasonCodes: { type: String, require: true },
  last_modified_by: { type: String, require: true },
  rejected: { type: Boolean, require: false }
}

const rejectedReasons = [
  { code: 1, reason: "Cantidad de materias aprobadas fuera de lo deseado" },
  { code: 2, reason: "No estudia/o carreras deseadas" },
  { code: 3, reason: "Edad fuera de rango" },
  { code: 4, reason: "Salario pretendido fuera de rango" },
  { code: 5, reason: "Ubicación" },
  { code: 6, reason: "No acepta horarios" },
  { code: 7, reason: "Ya trabajó en PwC" },
  { code: 8, reason: "No es universitario" }
]

module.exports = { rejectedReasons, candidateColumns };
