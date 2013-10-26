function ConvertRdToLatLong(x,y) {
	
	//console.log("X: "+x+" Y: "+y);
	x0  = 155000.000;
	y0  = 463000.000;

	f0 = 52.156160556;
	l0 =  5.387638889;

	a01=3236.0331637 ; b10=5261.3028966;
	a20= -32.5915821 ; b11= 105.9780241;
	a02=  -0.2472814 ; b12=   2.4576469;
	a21=  -0.8501341 ; b30=  -0.8192156;
	a03=  -0.0655238 ; b31=  -0.0560092;
	a22=  -0.0171137 ; b13=   0.0560089;
	a40=   0.0052771 ; b32=  -0.0025614;
	a23=  -0.0003859 ; b14=   0.0012770;
	a41=   0.0003314 ; b50=   0.0002574;
	a04=   0.0000371 ; b33=  -0.0000973;
	a42=   0.0000143 ; b51=   0.0000293;
	a24=  -0.0000090 ; b15=   0.0000291;
	
	with(Math){
		dx=(x-x0)*pow(10,-5);
		dy=(y-y0)*pow(10,-5);

		df =a01*dy + a20*pow(dx,2) + a02*pow(dy,2) + a21*pow(dx,2)*dy + a03*pow(dy,3)
		df+=a40*pow(dx,4) + a22*pow(dx,2)*pow(dy,2) + a04*pow(dy,4) + a41*pow(dx,4)*dy
		df+=a23*pow(dx,2)*pow(dy,3) + a42*pow(dx,4)*pow(dy,2) + a24*pow(dx,2)*pow(dy,4);
		 f = f0 + df/3600;

		dl =b10*dx +b11*dx*dy +b30*pow(dx,3) + b12*dx*pow(dy,2) + b31*pow(dx,3)*dy;
		dl+=b13*dx*pow(dy,3)+b50*pow(dx,5) + b32*pow(dx,3)*pow(dy,2) + b14*dx*pow(dy,4);
		dl+=b51*pow(dx,5)*dy +b33*pow(dx,3)*pow(dy,3) + b15*dx*pow(dy,5);
		 l = l0 + dl/3600;
	}
		
	 
	 
	fWgs= f + (-96.862 - 11.714 * (f-52)- 0.125 * (l-5)) / 100000;
	lWgs= l + (-37.902 +  0.329 * (f-52)-14.667 * (l-5)) / 100000;
	console.log("F: "+fWgs+" L: "+lWgs);
	
//	If you want to round the numbers you can do it like this	
// 	fWgs = Math.round(fWgs * 10000000) / 10000000;
// 	lWgs = Math.round(lWgs * 10000000) / 10000000;

	
	loc = new Object();
	loc.latitude = fWgs;
	loc.longitude = lWgs;
	
	return loc;
	
}

//Some RD datasets use a custom center. If you want to compute the real coordinates you have to add the coords of the center before using the above function.
function ConvertCustomRdToLatLong(x,y){
	//De coordinaten van het middelpunt moeten dus bij de meetwaarden worden opgeteld.
	x = 191332.9787575758 + x;
	y = 469917.1908484848 + y;
	return ConvertRdToLatLong(x,y);
}