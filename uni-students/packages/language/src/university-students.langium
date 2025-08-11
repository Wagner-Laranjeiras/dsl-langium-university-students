grammar UniversityStudents

entry Model: (students+=Student | disciplines+=Discipline | university+=University | statement+=Statement)*;

Student:
    'student' name=ID
    'age' age=INT;

Discipline:
    'discipline' name=ID;

University:
    'university' name=ID '{'
        'disciplines' disciplines+=[Discipline] (',' disciplines+=[Discipline])*
    '}';

Statement:
    student=[Student:ID] 'studies' discipline=[Discipline:ID] 'at' university=[University:ID];


hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
