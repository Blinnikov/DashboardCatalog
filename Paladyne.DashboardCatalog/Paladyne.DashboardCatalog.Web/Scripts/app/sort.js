define('sort', [], function () {

    var
        roomSort = function (roomA, roomB) {
            return roomA.name() > roomB.name() ? 1 : -1;
        },

        speakerSort = function (speakerA, speakerB) {
            return speakerA.fullName() > speakerB.fullName() ? 1 : -1;
        },
        
        speakerSessionSort = function (sessionA, sessionB) {
            return sessionA.title() > sessionB.title() ? 1 : -1;
        },

        trackSort = function (trackA, trackB) {
            return trackA.name() > trackB.name() ? 1 : -1;
        };

    return {
        roomSort: roomSort,
        speakerSessionSort: speakerSessionSort,
        speakerSort: speakerSort,
        trackSort: trackSort
    };
});