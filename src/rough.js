<div style={{ overflow: "hidden" }}>
  <Box>
    <Box
      sx={(theme) => ({
        width: "auto",
        display: "flex",
        maxHeight: "calc(100vh - 85px)",
        flexDirection: "row",
        justifyContent: "center",
        marginX: "auto",
        marginTop: "85px",
        backgroundColor: theme.palette.mode === "dark" ? "#25292e" : "#fff",
      })}
      gap="2vw"
    >
      <Popper sx={{ zIndex: 2 }} open={true}>
        <div
          style={{
            position: "absolute",
            left: "3vw",
            top: 100,
            width: "calc(23vw + 16px)",
            boxShadow: "0px 0px 0px #aaa",
            borderRadius: "15px",
          }}
        >
          <Accordion expanded={acc} onMouseOver={() => setacc(true)} onMouseLeave={() => setacc(false)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={(theme) => ({
                justifyItems: "center",
                alignContent: "center",
                marginY: "-5px",
                backgroundColor: theme.palette.mode === "dark" ? "rgba(235, 247, 233, 0.08)" : "#F7F7F7",
              })}
            >
              {" "}
              <Typography
                sx={(theme) => ({
                  fontSize: 15,
                  fontWeight: "bold",
                  color: theme.palette.mode === "dark" ? "#b0e09e" : "#143200",
                  marginLeft: "4px",
                })}
              >
                Adaptation at a glance
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ marginY: "-5px" }}>
              This overview page allows you to select a specific crop and region of your choice, and explore the associated adaptation options comprehensively on one page.
            </AccordionDetails>
          </Accordion>
        </div>
      </Popper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "4px",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "40px" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Box
            sx={(theme) => ({
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
              width: "23vw",
              backgroundColor: theme.palette.mode === "dark" ? "#2d3136" : "#F7F7F7",
              border: "0px solid black",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 14,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Location:{" "}
            </Typography>
            <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
            <Typography
              sx={(theme) => ({
                marginLeft: "5px",
                fontSize: 14,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Commodity:{" "}
            </Typography>
            <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
          </Box>
          <Box
            sx={(theme) => ({
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
              width: "23vw",
              backgroundColor: theme.palette.mode === "dark" ? "#2d3136" : "#F7F7F7",
              border: "0px solid black",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 13,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Scenario:{" "}
            </Typography>
            <Summ_Scenario handleScenario={handleScenario} scn={NameScenario}></Summ_Scenario>
            <Typography
              sx={(theme) => ({
                marginLeft: "5px",
                fontSize: 13,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Model:{" "}
            </Typography>
            <Summ_Model handleModel={handleModel} mdl={NameModel}></Summ_Model>
          </Box>
          <Box
            sx={(theme) => ({
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
              width: "23vw",
              backgroundColor: theme.palette.mode === "dark" ? "#2d3136" : "#F7F7F7",
              border: "0px solid black",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 13,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation Indicator:{" "}
            </Typography>
            <Summ_Adaptation_Indicator handleIndicator={changeOptLayer2} indc={optionlayer2}></Summ_Adaptation_Indicator>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "2vh" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/*  <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: "#FF0000",margin:'4px'}}/>
              <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
              Extreme
              </Typography>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFA500',margin:'4px'}}/>
              <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
              Very High
              </Typography>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFFF00',margin:'4px'}}/>
              <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
              High
              </Typography>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#00FF00',margin:'4px'}}/>
              <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
              Medium
              </Typography>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#059212',margin:'4px'}}/>
              <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
              Low
              </Typography>
              </Box> */}
            <Paper elevation={1} ref={impactBox}>
              <Map_Risk activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Risk>
            </Paper>
            <Popper
              open={true} // Always open
              anchorEl={impactBox.current} // Anchor to the Grid container
              placement="bottom" // Position it at the bottom
              disablePortal={true} // Stay within the DOM hierarchy
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, -70], // Adjust distance from the container
                  },
                },
              ]}
            >
              <LegendComp legendData={fetchthedataHzd("Pixel Level", "", "Value of Production", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
            </Popper>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          marginTop: "3px",
        }}
      >
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt activv={opt2} changeOption={handleChangeOptSumm} activeCrop={crop3}></Summ_Adapt>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box1}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt2}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box1.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            {/* offset: [0, -70] replaced +(paperWidth / 2 - 55), -85 */}
            <LegendComp legendData={fetchDataAdap(opt2, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt2 activv={opt3} changeOption={handleChangeOptSumm2} activeCrop={crop3}></Summ_Adapt2>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box2}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt3}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box2.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchDataAdap(opt3, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          marginTop: "3px",
        }}
      >
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt3 activv={opt4} changeOption={handleChangeOptSumm3} activeCrop={crop3}></Summ_Adapt3>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box3}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt4}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box3.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchDataAdap(opt4, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt4 activv={opt5} changeOption={handleChangeOptSumm4} activeCrop={crop3}></Summ_Adapt4>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box4}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt5}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box4.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchDataAdap(opt5, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          marginTop: "3px",
        }}
      >
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt5 activv={opt6} changeOption={handleChangeOptSumm5} activeCrop={crop3}></Summ_Adapt5>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box5}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt6}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box5.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchDataAdap(opt6, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
        <div>
          <Box
            sx={{
              paddingX: "8px",
              paddingY: "4px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Adaptation:{" "}
            </Typography>
            <Summ_Adapt6 activv={opt7} changeOption={handleChangeOptSumm6} activeCrop={crop3}></Summ_Adapt6>
          </Box>
          {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Unsuitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
              Suitable
              </Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
              <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
              Adaptation benefits
              </Typography>
              </Box>
              </Box> */}
          <Paper elevation={1} sx={{ width: "21vw" }} ref={box6}>
            <Map_Option
              activeCrop={crop2}
              focus={focus2}
              activeRegion={activeRegion2}
              activeOpt={opt7}
              area_dict={area_dict}
              activeScenario={NameScenario}
              activeOptLayer={optionlayer2}
              modelName={NameModel}
            ></Map_Option>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box6.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchDataAdap(opt7, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
          </Popper>
        </div>
      </Box>
    </Box>
  </Box>
</div>;
