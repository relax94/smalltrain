/**
 * Created by Dmytro.Pavlenko on 21.02.2017.
 */

if (typeof(Number.prototype.toRadians) === 'undefined') {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }
}

export function distanceBetweenXY(pointFrom, pointTo) {
    var R = 6371e3; // metres
    var φ1 = pointFrom.lat.toRadians();
    var φ2 = pointTo.lat.toRadians();
    var Δφ = (pointTo.lat-pointFrom.lat).toRadians();
    var Δλ = (pointTo.lng-pointFrom.lng).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    console.log(`Distance ${d}`);
    return d;
}
