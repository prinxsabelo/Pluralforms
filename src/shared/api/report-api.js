const ReportApi = {
    "boxes": [
        {
            "title": "Someday for Good?",
            "type": "YN",
            "content": [
                { "label": "Yes", "percentage": 66.7, "value": 3 },
                { "label": "No", "percentage": 33.3, "value": 1 }
            ],
            "summary": { "count": 4, "total": 5 },
        },
        {
            "title": "Rate my thoughts",
            "type": "RATING",
            "content": [
                { "label": "1", "percentage": 100, "value": 1 },
                { "label": "2", "percentage": 0, "value": 0 },
                { "label": "3", "percentage": 40, "value": 2 },
                { "label": "4", "percentage": 20, "value": 1 },
                { "label": "5", "percentage": 20, "value": 1 }
            ],
            "summary": { "count": 5, "shape": "star", "total": 5, "average": 2 },
        },
        {
            "title": "Arrogant for us?",
            "type": "RATING",
            "content": [
                { "label": "1", "percentage": 20, "value": 1 },
                { "label": "2", "percentage": 20, "value": 1 },
                { "label": "3", "percentage": 20, "value": 1 },
                { "label": "4", "percentage": 20, "value": 1 },
                { "label": "5", "percentage": 20, "value": 1 },
            ],
            "summary": { "count": 5, "shape": "thumb", "total": 5, "average": 2 },
        },
        {
            "title": "Cleaning out my closet?",
            "type": "RATING",
            "content": [
                { "label": "1", "percentage": 40, "value": 2 },
                { "label": "2", "percentage": 20, "value": 1 },
                { "label": "3", "percentage": 20, "value": 1 },
                { "label": "4", "percentage": 0, "value": 0 },
                { "label": "5", "percentage": 20, "value": 1 },
            ],
            "summary": { "count": 5, "shape": "heart", "total": 5, "average": 2 },
        },
        {
            "title": "Choose your thoughts?",
            "type": "CHOICE",
            "content": [
                {
                    "label": "Good",
                    "percentage": 60,
                    "value": 3
                },
                {
                    "label": "Bad",
                    "percentage": 20,
                    "value": 1
                },
                {
                    "label": "Fucked",
                    "percentage": 20,
                    "value": 1
                }

            ],
            "summary": { "count": 5, "total": 5, "average": 2 },
        },
        {
            "title": "Good for us?",
            "type": "YN",
            "content": [
                { "label": "Yes", "value": 50, "percentage": 50 },
                { "label": "No", "value": 50, "percentage": 50 }
            ],
            "summary": { "count": 4, "total": 5 },
        },
    ]
}
export default ReportApi;