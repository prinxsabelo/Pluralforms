const PayloadApi = {
    "form": {
        "title": "Black cofee game",
        "form_id": "1",
        "questions": [
            {
                "q_id": "q1",
                "title": "Someday for Good?",
                "type": "YN",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,

                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": [],

                }
            },
            {
                "q_id": "q2",
                "title": "Rate my thoughts",
                "type": "RATING",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q3",
                "title": "Arrogant for us?",
                "type": "RATING",
                "properties": {
                    "shape": "thumb",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q4",
                "title": "Cleaning out my closet?",
                "type": "RATING",

                "properties": {
                    "shape": "heart",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q5",
                "title": "Choose your thoughts?",
                "type": "CHOICE",

                "properties": {
                    "shape": "star",
                    "randomize": true,
                    "required": false,
                    "allow_multiple_selection": true,
                    "choices": [
                        {
                            "id": "1",
                            "label": "Good"
                        },
                        {
                            "id": "2",
                            "label": "Bad"
                        },
                        {
                            "id": "3",
                            "label": "Fucked"
                        }
                    ],
                    "responses": []
                }
            },
            {
                "q_id": "q6",
                "title": "Good for us?",
                "type": "YN",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": [
                        {
                            "response_id": "xxx",
                            "occupy": "YES",
                            "label": "Hell Yes"
                        },
                        {
                            "response_id": "xxx",
                            "occupy": "NO",
                            "label": "Hell No"
                        }
                    ]
                }
            },



            {
                "q_id": "q7",
                "title": "Can you drive me crazy?",
                "type": "YN",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,

                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": [],

                }
            },
            {
                "q_id": "q8",
                "title": "Rate my Jealousy",
                "type": "RATING",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q9",
                "title": "Your love for me id?",
                "type": "RATING",
                "properties": {
                    "shape": "thumb",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q10",
                "title": "My flow for you is",
                "type": "RATING",

                "properties": {
                    "shape": "heart",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": []
                }
            },
            {
                "q_id": "q11",
                "title": "My language is?",
                "type": "CHOICE",

                "properties": {
                    "shape": "star",
                    "randomize": true,
                    "required": false,
                    "allow_multiple_selection": true,
                    "choices": [
                        {
                            "id": "1",
                            "label": "Silly"
                        },
                        {
                            "id": "2",
                            "label": "Fluent"
                        },
                        {
                            "id": "3",
                            "label": "In control"
                        }
                    ],
                    "responses": []
                }
            },
            {
                "q_id": "q12",
                "title": "Do you love me?",
                "type": "YN",

                "properties": {
                    "shape": "star",
                    "allow_multiple_selection": false,
                    "required": false,
                    "randomize": false,
                    "choices": [],
                    "responses": [
                        {
                            "response_id": "xxx",
                            "occupy": "YES",
                            "label": "Hell Yes"
                        },
                        {
                            "response_id": "xxx",
                            "occupy": "NO",
                            "label": "Hell No"
                        }
                    ]
                }
            },
        ]
    }

}
export default PayloadApi;


// Model for response_tb
// {
//     response_id:integer,
//     queston_id:integer,
//     type:"",
//     occupy:"",

// }