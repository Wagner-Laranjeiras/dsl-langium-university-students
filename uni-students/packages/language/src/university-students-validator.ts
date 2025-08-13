import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { Discipline, Statement, type Student, type UniversityStudentsAstType } from './generated/ast.js';
import type { UniversityStudentsServices } from './university-students-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: UniversityStudentsServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.UniversityStudentsValidator;
    const checks: ValidationChecks<UniversityStudentsAstType> = {
       Student: validator.checkStudent,
       Statement: validator.checkStatement,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class UniversityStudentsValidator {
    checkStudent(student: Student, accept: ValidationAcceptor): void {
        if (!student.age) return
        const MIN_AGE: number = 10;
        // Check for student's age
        student.age < MIN_AGE
            ? accept('error', `Student needs to be of age ${MIN_AGE}+`, { node: student, property: 'age' })
            : null
    }

    checkStatement(statement: Statement, accept: ValidationAcceptor): void { // it really dos take only those 2 args, tried passing university but it didn't work
        if (!statement.discipline) return
        const university = statement.university?.ref; // .ref points to the refs source
        const universityDisciplines: (Discipline | undefined)[] = university?.disciplines?.map(d => d.ref) ?? [];
        // Check if discipline exists
        !universityDisciplines.includes(statement.discipline.ref)
            ? accept('error', `University ${university} doesn't contain discipline ${statement.discipline}`, { node: statement, property: 'discipline' })
            : null
    }
}
