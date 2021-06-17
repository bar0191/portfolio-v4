uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 mouse;
uniform float sinValue;
uniform float uZoom;
uniform float uZoomSpeed;
uniform float uScaleOn;
uniform float uZoomOn;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

float sphere(vec3 p) {
    return length(p) - 0.5;
}

float sdBox( vec3 p, vec3 b )
{
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float SineCrazy(vec3 p) {
    return 1.0-(sin(p.x) + sin(p.y) + sin(p.z))/3.0;
}

float scene(vec3 p) {
    // return sphere(p);

    vec3 p1 = rotate(p, vec3(1.,1.,1.), time * 0.01);
    // return sdBox(p1, vec3(0.5));
    // return max(sdBox(p1, vec3(0.4)), sphere(p));
    float scale = 15.0 + 10.0*sin(time/25.) * uScaleOn;

    return max(sphere(p), (0.85-SineCrazy(p1*scale))/scale);
}

vec3 getNormal(vec3 p){
    vec2 o = vec2(0.001, 0.0);

    return normalize(
        vec3(
            scene(p + o.xyy) - scene(p - o.xyy),
            scene(p + o.yxy) - scene(p - o.yxy),
            scene(p + o.yyx) - scene(p - o.yyx)
        )
    );
}

vec3 GetColor(float amount) {
    vec3 col = 0.5 + 0.5 * cos(6.28319 * (vec3(0.2, 0.0, 0.0) + amount * vec3(1.0, 1.0, 0.5)));

    return col * amount;
}

vec3 GetColorAmount(vec3 p) {

    float amount = clamp((1.5 - length(p))/2.0, 0.0, 1.0);

    vec3 col = 0.5 + 0.5 * cos(6.28319 * (vec3(0.2, 0.0, 0.0) + amount * vec3(1.0, 1.0, 0.5)));

    return col * amount;
}

void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    newUV = newUV - vec2(0.5);

    newUV.x -= mouse.x*0.05;
    newUV.y -= mouse.y*0.05;

    float bw = 1.0*step(newUV.x, 0.4);

    // camera position
    vec3 camPos= vec3(0.0, 0.0, uZoom + 0.5*sin(time/uZoomSpeed)*uZoomOn);

    vec3 ray = normalize(vec3(newUV, -1.0));
    // vec3 ray = normalize(camPos - vec3(newUV, -1.0));

    vec3 rayPos = camPos;

    float curDist = 0.0;
    float rayLen = 0.0;
    vec3 color = vec3(0.0);
    vec3 light = vec3(-1.0, 1.0, 1.0);

    for(int i=0; i<=64; i++){
        curDist = scene(rayPos);
        rayLen += 0.6*curDist;

        rayPos = camPos + ray*rayLen;

        if(abs(curDist)<0.001 ){
            vec3 n = getNormal(rayPos);

            float diff = dot(n, light);

            // color = vec3(diff,0.0,0.0);
            // color = GetColor(diff);
            // color = GetColor(2.0*length(rayPos));

            break;
        }
        // color += 0.01 * GetColor(length(rayPos));
        color += 0.04 * GetColorAmount(rayPos);
    }

    gl_FragColor = vec4(newUV,0.0,1.0);
    gl_FragColor = vec4(bw, 0.0, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);

    gl_FragColor.r -= abs(mouse.x)*0.6;

}